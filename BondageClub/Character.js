var Character = [];

// Loads a character in the buffer
function CharacterReset(CharacterID, CharacterAssetFamily) {

	// Prepares the character sheet
	var NewCharacter = {
		ID: CharacterID,
		Name: "",
		AssetFamily: CharacterAssetFamily,
		AccountName: "",
		AccountPassword: "",
		Inventory: [],		
		Appearance: [],
		Stage: "0",
		CurrentDialog: "",
		Dialog: [],
		Pose: [],
		Effect: [],
		FocusGroup: null,
		Canvas: null,
		CanvasBlink: null,
		BlinkFactor: Math.round(Math.random() * 10) + 10,
		AllowItem: true,
		HeightModifier: 0,
		CanTalk : function() { return ((this.Effect.indexOf("GagLight") < 0) && (this.Effect.indexOf("GagNormal") < 0) && (this.Effect.indexOf("GagHeavy") < 0) && (this.Effect.indexOf("GagTotal") < 0)) },
		CanWalk : function() { return (this.Effect.indexOf("Freeze") < 0) }
	}

	// If the character doesn't exist, we create it
	if (CharacterID >= Character.length)
		Character.push(NewCharacter);
	else
		Character[CharacterID] = NewCharacter;

	// Creates the inventory and default appearance
	if (CharacterID == 0) Player = NewCharacter;
	InventoryLoad(NewCharacter, null, true);
	CharacterAppearanceSetDefault(NewCharacter);
		
	// Load the character image
	CharacterLoadCanvas(NewCharacter);

}

// Creates a random name for the character
function CharacterRandomName(C) {

	// Generates a name from the name bank 
	var NewName = CharacterName[Math.floor(Math.random() * CharacterName.length)];
	C.Name = NewName;
	
	// If the name is already taken, we generate a new one
	for (var C = 0; C < Character.length; C++)
		if ((Character[C].Name == NewName) && (Character[C].ID != C.ID)) {
			CharacterRandomName(C)
			return;
		}

}

// Builds the dialog objects from the CSV files
function CharacterBuildDialog(C, CSV) {

	// For each lines in the file
	C.Dialog = [];
	for (var L = 0; L < CSV.length; L++)
		if ((CSV[L][0] != null) && (CSV[L][0] != "")) {

			// Creates a dialog object
			var D = {};
			D.Stage = CSV[L][0];
			if ((CSV[L][1] != null) && (CSV[L][1].trim() != "")) D.NextStage = CSV[L][1];
			if ((CSV[L][2] != null) && (CSV[L][2].trim() != "")) D.Option = CSV[L][2].replace("DialogCharacterName", C.Name).replace("DialogPlayerName", Player.Name);
			if ((CSV[L][3] != null) && (CSV[L][3].trim() != "")) D.Result = CSV[L][3].replace("DialogCharacterName", C.Name).replace("DialogPlayerName", Player.Name);
			if ((CSV[L][4] != null) && (CSV[L][4].trim() != "")) D.Function = ((CSV[L][4].trim().substring(0, 6) == "Dialog") ? "" : CurrentScreen) + CSV[L][4];
			if ((CSV[L][5] != null) && (CSV[L][5].trim() != "")) D.Prerequisite = CSV[L][5];
			C.Dialog.push(D);

		}

}

// Loads a CSV file to build the character dialog
function CharacterLoadCSVDialog(C) {

    // Finds the full path of the CSV file to use cache
    var FullPath = ((C.ID == 0) ? "Rooms/Player" : "Rooms/" + CurrentScreen + "/" + C.AccountName) + "_" + CommonGetWorkingLanguage() + ".csv";    
    if (CommonCSVCache[FullPath]) {
		CharacterBuildDialog(C, CommonCSVCache[FullPath]);
        return;
    }
    
    // Opens the file, parse it and returns the result it to build the dialog
    CommonGet(FullPath, function() {
        if (this.status == 200) {
            CommonCSVCache[FullPath] = CommonParseCSV(this.responseText);
			CharacterBuildDialog(C, CommonCSVCache[FullPath]);
        }
    });
	
}

// Loads in the NPC character in the buffer
function CharacterLoadNPC(NPCType) {

	// Checks if the NPC already exists and returns it if it's the case
	for (var C = 0; C < Character.length; C++)
		if (Character[C].AccountName == NPCType)
			return Character[C];

	// Randomize the new character
	CharacterReset(Character.length, "Female3DCG");
	C = Character[Character.length - 1];
	C.AccountName = NPCType;
	CharacterLoadCSVDialog(C);
	CharacterRandomName(C);
	CharacterAppearanceFullRandom(C);
	
	// Maid archetype
	if (NPCType.indexOf("Maid") >= 0) {
		InventoryAdd(C, "MaidOutfit1", "Cloth");
		CharacterAppearanceSetItem(C, "Cloth", C.Inventory[C.Inventory.length - 1].Asset);
		CharacterAppearanceSetColorForGroup(C, "Default", "Cloth");
		InventoryAdd(C, "MaidHairband1", "Hat");
		CharacterAppearanceSetItem(C, "Hat", C.Inventory[C.Inventory.length - 1].Asset);
		CharacterAppearanceSetColorForGroup(C, "Default", "Hat");
	}

	// Returns the new character
	return C;
	
}

// Adds new effects on a character if it's not already there
function CharacterAddPose(C, NewPose) {
	for (var E = 0; E < NewPose.length; E++)
		if (C.Pose.indexOf(NewPose[E]) < 0)
			C.Pose.push(NewPose[E]);
}

// Resets the current pose list on a character
function CharacterLoadPose(C) {	
	C.Pose = [];
	for (var A = 0; A < C.Appearance.length; A++) {
		if (C.Appearance[A].Asset.SetPose != null)
			CharacterAddPose(C, C.Appearance[A].Asset.SetPose);
		else
			if (C.Appearance[A].Asset.Group.SetPose != null)
				CharacterAddPose(C, C.Appearance[A].Asset.Group.SetPose);
	}	
}

// Adds new effects on a character if it's not already there
function CharacterAddEffect(C, NewEffect) {
	for (var E = 0; E < NewEffect.length; E++)
		if (C.Effect.indexOf(NewEffect[E]) < 0)
			C.Effect.push(NewEffect[E]);
}

// Resets the current effect list on a character
function CharacterLoadEffect(C) {	
	C.Effect = [];
	for (var A = 0; A < C.Appearance.length; A++) {
		if (C.Appearance[A].Asset.Effect != null)
			CharacterAddEffect(C, C.Appearance[A].Asset.Effect);
		else
			if (C.Appearance[A].Asset.Group.Effect != null)
				CharacterAddEffect(C, C.Appearance[A].Asset.Group.Effect);
	}	
}

// Sorts the character appearance by priority and loads the canvas
function CharacterLoadCanvas(C) {
		
	// Sorts the full appearance arraw first
	var App = [];
	for (var I = 0; I < 101 && App.length < C.Appearance.length; I++)
		for (var A = 0; A < C.Appearance.length; A++)
			if (C.Appearance[A].Asset.Group.DrawingPriority == I)
				App.push(C.Appearance[A]);
	C.Appearance = App;
	
	// Sets the total height modifier for that character
	C.HeightModifier = 0;
	for (var A = 0; A < C.Appearance.length; A++)
		C.HeightModifier = C.HeightModifier + C.Appearance[A].Asset.HeightModifier;
	
	// Reload the canvas
	CharacterAppearanceBuildCanvas(C);

}

// Reload all characters canvas
function CharacterLoadCanvasAll() {
	for (var C = 0; C < Character.length; C++)
		CharacterLoadCanvas(Character[C]);
}