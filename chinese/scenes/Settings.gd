extends Control

func _ready():
	$btn_snd.connect("button_down",self,"onClick",[$btn_snd])
	$btn_vbr.connect("button_down",self,"onClick",[$btn_vbr])
	$btn_lan.connect("button_down",self,"onClick",[$btn_lan])
	$btn_back.connect("button_down",self,"onClick",[$btn_back])	
	update_icons()

func onClick(button):
	if button==$btn_back: Global.goto_scene("Menu")
	if button==$btn_snd: 
		if Global.options.sound=="on": 
			Global.options.sound = "off"
			Global.stop_sounds()
		else: 
			Global.options.sound = "on"
			Global.play_music()
	if button==$btn_vbr: 
		if Global.options.vibration=="on": Global.options.vibration = "off"
		else: 
			Global.options.vibration = "on"
			Input.vibrate_handheld(500)
	if button==$btn_lan: 
		if Global.options.language=="en": Global.options.language = "ru"
		elif Global.options.language=="ru": Global.options.language = "zh"
		elif Global.options.language=="zh": Global.options.language = "en"
	Global.btn_click_effect(button)
	update_icons()
	traduction()
	Global.save_store_data()

func update_icons():
	$btn_snd.icon = load("res://assets/settings/settings_btn_sound_"+Global.options.sound+".png")
	$btn_vbr.icon = load("res://assets/settings/settings_btn_vibration_"+Global.options.vibration+".png")
	$btn_lan.icon = load("res://assets/settings/settings_btn_language_"+Global.options.language+".png")

func traduction():
	$btn_back.icon = load("res://assets/settings/settings_btn_back_"+Global.options.language+".png")
