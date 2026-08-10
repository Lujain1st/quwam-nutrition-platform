%% Obesity Macro-Scenario Classifier — Fuzzy Inference System (Mamdani)
% Ready to run in MATLAB with Fuzzy Logic Toolbox.
%
% Purpose: choose which of Asmaa's 3 pre-built macronutrient scenarios
% (from PORTION_SIZE_EXCEL.xlsx) best fits a client, instead of computing
% a continuous macro percentage. The 3 scenarios become 3 discrete output
% classes on a 0-2 axis; the defuzzified result is rounded to the nearest
% class.
%
% Inputs : BMI (15-50), Activity_Factor (1.2-1.9)  [same as the calorie-
%          deficit FIS, so both modules share the same input encoding]
% Output : Scenario (0 = Balanced, 1 = High-Protein, 2 = High-Carb)
%
% NOTE: the rule logic below is a first-pass hypothesis (higher activity
% tolerates more carbs; sedentary + severe obesity favors protein to
% protect lean mass). It must be tuned against Asmaa's real case-by-case
% choices (Idea 1 / "Obesity Knowledge system" sheet) before being
% considered final — see the calibration section at the bottom.

fis = mamfis('Name', 'ObesityMacroScenarioFIS');

%% Input 1: BMI (identical definition to the calorie-deficit FIS)
fis = addInput(fis, [15 50], 'Name', 'BMI');
fis = addMF(fis, 'BMI', 'trapmf', [15 15 23 25], 'Name', 'Normal');
fis = addMF(fis, 'BMI', 'trapmf', [23 25 28 30], 'Name', 'Overweight');
fis = addMF(fis, 'BMI', 'trapmf', [28 30 33 35], 'Name', 'ObesityI');
fis = addMF(fis, 'BMI', 'trapmf', [33 35 38 40], 'Name', 'ObesityII');
fis = addMF(fis, 'BMI', 'trapmf', [38 40 50 50], 'Name', 'SevereObesity');

%% Input 2: Physical Activity Factor (identical to the calorie-deficit FIS)
fis = addInput(fis, [1.2 1.9], 'Name', 'Activity');
fis = addMF(fis, 'Activity', 'trapmf', [1.2 1.2 1.2 1.3],  'Name', 'Sedentary');
fis = addMF(fis, 'Activity', 'trimf',  [1.2 1.375 1.55],   'Name', 'LightlyActive');
fis = addMF(fis, 'Activity', 'trimf',  [1.375 1.55 1.725], 'Name', 'ModeratelyActive');
fis = addMF(fis, 'Activity', 'trimf',  [1.55 1.725 1.9],   'Name', 'VeryActive');
fis = addMF(fis, 'Activity', 'trapmf', [1.725 1.9 1.9 1.9],'Name', 'ExtremelyActive');

%% Output: Scenario class (0=Balanced, 1=ModerateCarb, 2=HighProtein, 3=HighCarb)
fis = addOutput(fis, [0 3], 'Name', 'Scenario');
fis = addMF(fis, 'Scenario', 'trimf', [0 0 1], 'Name', 'Balanced');
fis = addMF(fis, 'Scenario', 'trimf', [1 1 2], 'Name', 'HighProtein');
fis = addMF(fis, 'Scenario', 'trimf', [0 2 3], 'Name', 'ModerateCarb');
fis = addMF(fis, 'Scenario', 'trimf', [2 3 3], 'Name', 'HighCarb');

%% Rules
% Format: [BMI_MF Activity_MF Output_MF Weight Operator(1=AND,2=OR)]
% 0 in an antecedent column = "don't care" (matches any value of that input)
% BMI:      1 Normal | 2 Overweight | 3 ObesityI | 4 ObesityII | 5 SevereObesity
% Activity: 1 Sedentary | 2 LightlyActive | 3 ModeratelyActive | 4 VeryActive | 5 ExtremelyActive
% Scenario: 1 Balanced | 2 HighProtein | 3 ModerateCarb | 4 HighCarb

ruleList = [
    0 4 4 1 1   % IF Activity=VeryActive                          THEN Scenario=HighCarb     (any BMI)
    0 5 4 1 1   % IF Activity=ExtremelyActive                     THEN Scenario=HighCarb     (any BMI)
    0 3 3 1 1   % IF Activity=ModeratelyActive                     THEN Scenario=ModerateCarb (any BMI)
    4 1 2 1 1   % IF BMI=ObesityII      AND Activity=Sedentary     THEN Scenario=HighProtein
    4 2 2 1 1   % IF BMI=ObesityII      AND Activity=LightlyActive THEN Scenario=HighProtein
    5 1 2 1 1   % IF BMI=SevereObesity  AND Activity=Sedentary     THEN Scenario=HighProtein
    5 2 2 1 1   % IF BMI=SevereObesity  AND Activity=LightlyActive THEN Scenario=HighProtein
    1 0 1 1 1   % IF BMI=Normal                                    THEN Scenario=Balanced     (any activity)
    2 0 1 1 1   % IF BMI=Overweight                                THEN Scenario=Balanced
    3 0 1 1 1   % IF BMI=ObesityI                                  THEN Scenario=Balanced
];
fis = addRule(fis, ruleList);

writeFIS(fis, 'ObesityMacroScenarioFIS');
% Open the visual editor to inspect/tune:
% fuzzyLogicDesigner(fis)

%% Example evaluation + mapping back to a scenario name
testInput = [37 1.2];  % BMI=37 (Obesity II), Sedentary
scenarioScore = evalfis(fis, testInput);
scenarioNames = {'Balanced', 'High-Protein', 'Moderate-Carb', 'High-Carb'};
scenarioIndex = round(scenarioScore) + 1;  % 0->1, 1->2, 2->3, 3->4 (MATLAB 1-indexed)
fprintf('BMI=%.1f, Activity=%.3f -> Scenario score=%.2f -> %s\n', ...
    testInput(1), testInput(2), scenarioScore, scenarioNames{scenarioIndex});

%% ---------------------------------------------------------------------
%% CALIBRATION STEP (must be done before this module is considered final)
%% ---------------------------------------------------------------------
% Run every real case from Asmaa's "Obesity Knowledge system" sheet
% (BMI, Activity) through this FIS, compare the predicted scenario to the
% scenario she actually chose for that client, and adjust:
%   - the membership function boundaries (e.g. where "Sedentary" ends)
%   - the rule set (e.g. add a rule for BMI=ObesityI + Sedentary if her
%     real choices show a pattern the current rules miss)
%   - rule weights (soften/strengthen specific rules)
% until predictions match her real decisions within an acceptable margin.