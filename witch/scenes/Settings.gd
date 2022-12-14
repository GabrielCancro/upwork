extends Control

func _ready():
	$btn_back.connect("button_down",self,"onClick",[$btn_back])
	$btn_sound.connect("button_down",self,"onClick",[$btn_sound])
	$btn_vibration.connect("button_down",self,"onClick",[$btn_vibration])
	$btn_language.connect("button_down",self,"onClick",[$btn_language])
	update_icons()

func onClick(button):
	if button==$btn_back: Global.goto_scene("Menu")
	if button==$btn_sound: 
		if Global.options.sound=="on": 
			Global.options.sound = "off"
			Global.stop_sounds()
		else: 
			Global.options.sound = "on"
			Global.play_music()
	if button==$btn_vibration: 
		if Global.options.vibration=="on": Global.options.vibration = "off"
		else: 
			Global.options.vibration = "on"
			Input.vibrate_handheld(500)
	if button==$btn_language: 
		if Global.options.language=="en": Global.options.language = "ru"
		else: Global.options.language = "en"
	Global.btn_click_effect(button)
	update_icons()
	traduction()
	Global.save_store_data()

func update_icons():
	$btn_sound.icon = load("res://assets/settings/settings_btn_sound_"+Global.options.sound+".png")
	$btn_vibration.icon = load("res://assets/settings/settings_btn_vibration_"+Global.options.vibration+".png")
	$btn_language.icon = load("res://assets/settings/settings_btn_language_"+Global.options.language+".png")

func traduction():
	$btn_title.icon = load("res://assets/settings/settings_btn_settings_"+Global.options.language+".png")
