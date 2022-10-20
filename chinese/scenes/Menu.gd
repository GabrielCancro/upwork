extends Control

func _ready():
	$btn_start.connect("button_down",self,"onClick",[$btn_start])
	$btn_settings.connect("button_down",self,"onClick",[$btn_settings])

func onClick(button):
	if button==$btn_start: Global.goto_scene("Gameplay1")
	if button==$btn_settings: Global.goto_scene("Settings")
	Global.btn_click_effect(button)

func traduction():
	$btn_settings.icon = load("res://assets/menu/main_btn_settings_"+Global.options.language+".png")
	$btn_start.icon = load("res://assets/menu/main_btn_start_"+Global.options.language+".png")
