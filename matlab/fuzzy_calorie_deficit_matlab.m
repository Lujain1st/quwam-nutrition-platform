%% Obesity Calorie Deficit — Fuzzy Inference System (Mamdani)
% Ready to run in MATLAB with Fuzzy Logic Toolbox (R2017b or later,
% scripting API: mamfis / addInput / addMF / addRule / evalfis).
%
% Inputs : BMI (15-50), Activity_Factor (1.2-1.9)
% Output : Calorie_Deficit_Percent (0-30, i.e. % to subtract from TDEE)
%
% This models the same BMI-based deficit table already used in the
% Excel decision tree, but replaces the hard BMI cutoffs (25/30/35/40)
% with smooth fuzzy transitions so borderline clients (e.g. BMI 29.9
% vs 30.1) aren't treated as two completely different cases.

fis = mamfis('Name', 'ObesityCalorieDeficitFIS');

%% Input 1: BMI
fis = addInput(fis, [15 50], 'Name', 'BMI');
fis = addMF(fis, 'BMI', 'trapmf', [15 15 23 25], 'Name', 'Normal');
fis = addMF(fis, 'BMI', 'trapmf', [23 25 28 30], 'Name', 'Overweight');
fis = addMF(fis, 'BMI', 'trapmf', [28 30 33 35], 'Name', 'ObesityI');
fis = addMF(fis, 'BMI', 'trapmf', [33 35 38 40], 'Name', 'ObesityII');
fis = addMF(fis, 'BMI', 'trapmf', [38 40 50 50], 'Name', 'SevereObesity');

%% Input 2: Physical Activity Factor
fis = addInput(fis, [1.2 1.9], 'Name', 'Activity');
fis = addMF(fis, 'Activity', 'trapmf', [1.2 1.2 1.2 1.3],  'Name', 'Sedentary');
fis = addMF(fis, 'Activity', 'trimf',  [1.2 1.375 1.55],   'Name', 'LightlyActive');
fis = addMF(fis, 'Activity', 'trimf',  [1.375 1.55 1.725], 'Name', 'ModeratelyActive');
fis = addMF(fis, 'Activity', 'trimf',  [1.55 1.725 1.9],   'Name', 'VeryActive');
fis = addMF(fis, 'Activity', 'trapmf', [1.725 1.9 1.9 1.9],'Name', 'ExtremelyActive');

%% Output: Calorie Deficit Percent (of TDEE)
fis = addOutput(fis, [0 30], 'Name', 'DeficitPercent');
fis = addMF(fis, 'DeficitPercent', 'trimf', [0 0 8],   'Name', 'None');
fis = addMF(fis, 'DeficitPercent', 'trimf', [5 12 18], 'Name', 'Mild');
fis = addMF(fis, 'DeficitPercent', 'trimf', [15 20 25],'Name', 'Moderate');
fis = addMF(fis, 'DeficitPercent', 'trimf', [20 25 30],'Name', 'High');
fis = addMF(fis, 'DeficitPercent', 'trimf', [25 30 30],'Name', 'VeryHigh');

%% Rules
% Format: [BMI_MF Activity_MF Output_MF Weight Operator(1=AND,2=OR)]
% MF index order matches the addMF calls above (1=first MF added, etc.)
% BMI:      1 Normal | 2 Overweight | 3 ObesityI | 4 ObesityII | 5 SevereObesity
% Activity: 1 Sedentary | 2 LightlyActive | 3 ModeratelyActive | 4 VeryActive | 5 ExtremelyActive
% Deficit:  1 None | 2 Mild | 3 Moderate | 4 High | 5 VeryHigh

ruleList = [
    1 0 1 1 1   % IF BMI=Normal                                  THEN Deficit=None
    2 0 2 1 1   % IF BMI=Overweight                               THEN Deficit=Mild
    3 0 2 1 1   % IF BMI=ObesityI                                 THEN Deficit=Mild
    4 0 3 1 1   % IF BMI=ObesityII                                THEN Deficit=Moderate
    5 1 5 1 1   % IF BMI=SevereObesity AND Activity=Sedentary     THEN Deficit=VeryHigh
    5 2 4 1 1   % IF BMI=SevereObesity AND Activity=LightlyActive THEN Deficit=High
    5 3 4 1 1   % IF BMI=SevereObesity AND Activity=ModeratelyActive THEN Deficit=High
    5 4 3 1 1   % IF BMI=SevereObesity AND Activity=VeryActive    THEN Deficit=Moderate
    5 5 3 1 1   % IF BMI=SevereObesity AND Activity=ExtremelyActive THEN Deficit=Moderate
    0 4 2 0.3 1 % IF Activity=VeryActive       THEN Deficit=Mild (soft nudge, low weight)
    0 5 2 0.3 1 % IF Activity=ExtremelyActive  THEN Deficit=Mild (soft nudge, low weight)
];
fis = addRule(fis, ruleList);

%% Save the FIS for reuse / inspection in the GUI
writeFIS(fis, 'ObesityCalorieDeficitFIS');
% Open the visual editor to inspect/tune membership functions and rules:
% fuzzyLogicDesigner(fis)

%% Example evaluation (matches a row from the Excel: BMI 32, Moderately Active)
testInput = [32 1.55];
deficitPct = evalfis(fis, testInput);
fprintf('BMI=%.1f, Activity=%.3f -> Deficit = %.1f%% of TDEE\n', ...
    testInput(1), testInput(2), deficitPct);

% To get the final calorie target, apply the gender-based floor agreed
% on for the crisp rules (Male = 1500 kcal, Female = 1200 kcal):
tdee_example = 2384; % from Excel row example
sex_example = 'Female'; % 'Male' or 'Female'
if strcmp(sex_example, 'Male')
    floor_kcal = 1500;
else
    floor_kcal = 1200;
end
calorie_target = max(tdee_example * (1 - deficitPct/100), floor_kcal);
fprintf('TDEE=%d (%s) -> Calorie target = %.0f kcal\n', tdee_example, sex_example, calorie_target);