extends Control

func _ready():
	Global.init_scene(name)
	$btn_back.connect("button_down",self,"onClick",[$btn_back])
	$btn_sound.connect("button_down",self,"onClick",[$btn_sound])
	$btn_vibration.connect("button_down",self,"onClick",[$btn_vibration])
	$btn_language.connect("button_down",self,"onClick",[$btn_language])
	update_icons()

func onClick(button):
	if button==$btn_back: Global.goto_scene("Main")
	if button==$btn_sound: 
		if Global.options.sound=="on": Global.options.sound = "off"
		else: Global.options.sound = "on"
	if button==$btn_vibration: 
		if Global.options.vibration=="on": Global.options.vibration = "off"
		else: Global.options.vibration = "on"
	if button==$btn_language: 
		if Global.options.language=="en": Global.options.language = "ru"
		else: Global.options.language = "en"
	update_icons()

func update_icons():
	$btn_sound.icon = load("res://assets/settings/settings_btn_sound_"+Global.options.sound+".png")
	$btn_vibration.icon = load("res://assets/settings/settings_btn_vibration_"+Global.options.vibration+".png")
	$btn_language.icon = load("res://assets/settings/settings_btn_language_"+Global.options.language+".png")
