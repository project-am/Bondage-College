var AssetFemale3DCG = [

	// Appearance specific
	{
		Group: "BodyUpper",
		Priority: 2,
		AllowNone: false,
		AllowColorize: false,
		Color: ["White", "Asian", "Black"],
		Asset: ["Small", "Normal", "Large", "XLarge"],
	},

	{
		Group: "BodyLower",
		Priority: 3,
		AllowNone: false,
		AllowColorize: false,
		ParentSize: "BodyUpper",
		ParentColor: "BodyUpper",
		AllowPose: ["LegsClosed"],
		Color: ["White", "Asian", "Black"],
		Top: 462,
		Asset: ["Small", "Normal", "Large", "XLarge"]
	},
	
	{
		Group: "Cloth",
		Priority: 19,
		ParentGroup: "BodyUpper",
		Color: ["Default", "#202020", "#808080", "#bbbbbb", "#aa8080", "#80aa80", "#8080aa", "#aaaa80", "#80aaaa", "#aa80aa", "#cc3333", "#33cc33", "#3333cc", "#cccc33", "#33cccc", "#cc33cc"],
		Asset: [ { Name: "CollegeOutfit1", Value: -1 }, { Name: "MaidOutfit1", Value: -1 }, "StudentOutfit1", "StudentOutfit2", "SummerDress1", "BabydollDress1", "TeacherOutfit1", "TennisOutfit1", "ChineseDress1"]
	},
	 
	{
		Group: "HairBack",
		Priority: 1,
		KeepNaked: true,
		Color: ["#6a3628", "#202020", "#dcc787", "#6c2132", "#999999", "#dddddd", "#e781b1", "#81e7b1", "#81b1e7", "#eeee99", "#ee9999", "#ee99ee"],
		Left: 50,
		Top: 0,
		Asset: ["HairBack1", "HairBack2", "HairBack4", "HairBack10", "HairBack14", "HairBack15", "HairBack16", "HairBack17", "HairBack18", "HairBack19"]
	},

	{
		Group: "HairFront",
		Priority: 20,
		AllowNone: false,
		ParentColor: "HairBack",
		Color: ["#6a3628", "#202020", "#dcc787", "#6c2132", "#999999", "#dddddd", "#e781b1", "#81e7b1", "#81b1e7", "#eeee99", "#ee9999", "#ee99ee"],
		Left: 150,
		Top: 50,
		Asset: ["HairFront1", "HairFront2", "HairFront3", "HairFront4", "HairFront5", "HairFront6", "HairFront7", "HairFront8", "HairFront9", "HairFront10", "HairFront11", "HairFront12"]
	},

	{
		Group: "Hat",
		Priority: 21,
		Default: false,
		Color: ["Default", "#202020", "#808080", "#bbbbbb", "#aa8080", "#80aa80", "#8080aa", "#aaaa80", "#80aaaa", "#aa80aa", "#cc3333", "#33cc33", "#3333cc", "#cccc33", "#33cccc", "#cc33cc"],
		Left: 125,
		Top: 0,
		Asset: ["Band1", "Beret1", "Ears1", "Ears2", { Name: "MaidHairband1", Value: -1 }]
	},

	{
		Group: "Eyes",
		Priority: 4,
		AllowNone: false,
		Color: ["#6a3628", "#5e481e", "#666666", "#555588", "#558855", "#885555", "#202020", "#aa3333", "#33aa33", "#3333aa", "#aaaa33", "#33aaaa", "#aa33aa"],
		Left: 200,
		Top: 150,
		FullAlpha: false,
		Blink: true,
		Asset: ["Eyes1", "Eyes2", "Eyes3", "Eyes4", "Eyes5", "Eyes6", "Eyes7", "Eyes8", "Eyes9", "Eyes10", "Eyes11"]
	},
	
	{
		Group: "Glasses",
		Priority: 12,
		Default: false,
		KeepNaked: true,
		Color: ["#303030", "#808080", "#e0e0e0", "#aa8080", "#80aa80", "#8080aa", "#aaaa80", "#80aaaa", "#aa80aa", "#cc3333", "#33cc33", "#3333cc", "#cccc33", "#33cccc", "#cc33cc"],
		Left: 200,
		Top: 135,
		Asset: ["Glasses1", "Glasses2", "Glasses3", "Glasses4", "Glasses5", "Glasses6", "Glasses7", "Glasses8"]
	},

	{
		Group: "Mouth",
		Priority: 5,
		AllowNone: false,
		Color: ["Default", "#803d26", "#aa5555", "#cc3333", "#55aa55", "#5555aa", "#55aaaa", "#aa55aa", "#aaaa55"],
		Left: 240,
		Top: 190,
		Asset: ["Mouth1", "Mouth2", "Mouth3", "Mouth4"]
	},
	
	{
		Group: "Gloves",
		Priority: 16,
		ParentGroup: "BodyUpper",
		Default: false,
		Color: ["#bbbbbb", "#808080", "#202020", "#aa8080", "#80aa80", "#8080aa", "#aaaa80", "#80aaaa", "#aa80aa", "#cc3333", "#33cc33", "#3333cc", "#cccc33", "#33cccc", "#cc33cc"],
		Left: 125,
		Top: 275,
		Asset: ["Gloves1", "Gloves2"]
	},
	
	{
		Group: "Nipples",
		Priority: 8,
		ParentGroup: "BodyUpper",
		AllowNone: false,
		Color: ["Default", "#a6665b", "#803d26", "#d68777", "#9b4a2e", "#bb6655"],
		Left: 175,
		Top: 285,
		Asset: ["Nipples1", "Nipples2"]
	},
	
	{
		Group: "Bra",
		Priority: 13,
		ParentGroup: "BodyUpper",
		Color: ["#bbbbbb", "#808080", "#202020", "#aa8080", "#80aa80", "#8080aa", "#aaaa80", "#80aaaa", "#aa80aa", "#cc3333", "#33cc33", "#3333cc", "#cccc33", "#33cccc", "#cc33cc"],
		Left: 150,
		Top: 200,
		Asset: ["Bra1", "Bra2", "Bra7"]
	},

	{
		Group: "Pussy",
		Priority: 9,
		AllowNone: false,
		Color: ["Default", "#6a3628", "#443330", "#222222"],
		Left: 225,
		Top: 500,
		FullAlpha: false,
		Asset: ["PussyLight1", "PussyLight2", "PussyLight3", "PussyDark1", "PussyDark2", "PussyDark3"]
	},
	
	{
		Group: "Panties",
		Priority: 14,
		ParentGroup: "BodyLower",
		Color: ["#bbbbbb", "#808080", "#202020", "#aa8080", "#80aa80", "#8080aa", "#aaaa80", "#80aaaa", "#aa80aa", "#cc3333", "#33cc33", "#3333cc", "#cccc33", "#33cccc", "#cc33cc"],
		Left: 150,
		Top: 425,
		Asset: ["Panties1", "Panties7", "Panties8", "Panties11", "Shorts1"]
	},

	{
		Group: "Socks",
		Priority: 15,
		ParentGroup: "BodyLower",
		Color: ["#bbbbbb", "#808080", "#202020", "#aa8080", "#80aa80", "#8080aa", "#aaaa80", "#80aaaa", "#aa80aa", "#cc3333", "#33cc33", "#3333cc", "#cccc33", "#33cccc", "#cc33cc"],
		Left: 125,
		Top: 500,
		Asset: ["Socks1", "Socks2", "Socks3", "Socks4", "Socks5", "Stockings1", "Stockings2"]
	},

	{
		Group: "Shoes",
		Priority: 17,
		ParentGroup: "BodyLower",
		Color: ["Default", "#bbbbbb", "#808080", "#202020", "#aa8080", "#80aa80", "#8080aa", "#aaaa80", "#80aaaa", "#aa80aa", "#cc3333", "#33cc33", "#3333cc", "#cccc33", "#33cccc", "#cc33cc"],
		Left: 125,
		Top: 500,
		Asset: [
			{ Name: "Shoes1", Height: 6 },
			{ Name: "Shoes2", Height: 6 },
			{ Name: "Shoes4", Height: 6 },
			{ Name: "Sneakers1", Height: 3 },
			{ Name: "Sneakers2", Height: 3 },
			{ Name: "Heels1", Height: 15 },
			{ Name: "Heels2", Height: 15 },
			{ Name: "Boots1", Height: 9 }
		]
	},

	// Item specific
	{
		Group: "ItemFeet",
		Category: "Item",
		Priority: 22,
		ParentGroup: "BodyLower",
		Default: false,
		Effect: ["Freeze", "Prone"],
		Color: ["Default"],
		SetPose: ["LegsClosed"],
		Left: 125,
		Top: 725,
		Zone: [[100, 730, 300, 260]],
		Asset: [ { Name: "NylonRope", Value: -1 }, { Name: "HempRope", Value: -1 } ]
	},

	{
		Group: "ItemLegs",
		Category: "Item",
		Priority: 23,
		ParentGroup: "BodyLower",
		Default: false,
		Effect: ["Prone"],
		Color: ["Default"],
		SetPose: ["LegsClosed"],
		Left: 125,
		Top: 500,
		Zone: [[100, 550, 300, 180]],
		Asset: [ { Name: "NylonRope", Value: -1 }, { Name: "HempRope", Value: -1 } ]
	},

	{
		Group: "ItemPelvis",
		Category: "Item",
		Priority: 10,
		Default: false,
		Effect: ["Chaste"],
		Color: ["Default"],
		Left: 150,
		Top: 50,
		Zone: [[150, 425, 200, 125]],
		Asset: [ { Name: "MetalChastityBelt", Value: -1, Visible: false }, { Name: "RegularVibratingEgg", Value: -1, Effect: [], Visible: false } ]
	},

	{
		Group: "ItemTorso",
		Category: "Item",
		Priority: 11,
		Default: false,
		Color: ["Default"],
		Left: 150,
		Top: 50,
		Zone: [[150, 260, 200, 165]],
		Asset: [ { Name: "NylonRopeHarness", Value: -1 }, { Name: "HempRopeHarness", Value: -1 }, { Name: "LeatherHarness", Value: -1 } ]
	},

	{
		Group: "ItemArms",
		Category: "Item",
		Priority: 18,
		Default: false,
		Effect: ["Block", "Prone"],
		Color: ["Default"],
		Left: 150,
		Top: 50,
		Zone: [[50, 250, 100, 250], [350, 250, 100, 250]],
		Asset: [ { Name: "NylonRope", Value: -1 }, { Name: "HempRope", Value: -1 }, { Name: "MetalCuffs", Value: -1}, { Name: "MetalCuffsKey", Effect: ["Unlock"], Value: -1}, { Name: "LeatherArmbinder", Value: -1} ]
	},

	{
		Group: "ItemNeck",
		Category: "Item",
		Priority: 6,
		Default: false,
		Color: ["Default"],
		Left: 200,
		Top: 190,
		Zone: [[150, 210, 200, 50]],
		Asset: [ { Name: "LeatherCollar", Value: -1 } ]
	},
	
	{
		Group: "ItemMouth",
		Category: "Item",
		Priority: 7,
		Default: false,
		Effect: ["GagNormal"],
		Color: ["Default"],
		Left: 150,
		Top: 50,
		Zone: [[150, 160, 200, 50]],
		Asset: [ { Name: "SmallClothGag", Effect: ["GagLight"], Value: -1 }, { Name: "ClothCleaveGag", Effect: ["GagLight"], Value: -1 }, { Name: "ClothOTMGag", Value: -1 }, { Name: "ClothOTNGag", Value: -1 }, { Name: "HarnessBallGag", Effect: ["GagHeavy"], Value: -1 }, { Name: "DuctTapeGag", Value: -1 } ]
	},

	{
		Group: "ItemHead",
		Category: "Item",
		Priority: 24,
		Default: false,
		Effect: ["Blind", "Prone"],
		Color: ["Default"],
		Left: 150,
		Top: 50,
		Zone: [[150, 35, 200, 110]],
		Asset: [ { Name: "LeatherBlindfold", Value: -1 }, { Name: "LeatherHood", Value: -1 } ]
	}
	
];