extends Control

func _ready():
	$btn_start.connect("button_down",self,"onClick",[$btn_start])
	$btn_aura.connect("button_down",self,"onClick",[$btn_aura])
	$btn_info.connect("button_down",self,"onClick",[$btn_info])
	$btn_config.connect("button_down",self,"onClick",[$btn_config])

func onClick(button):
	if button==$btn_start: Global.goto_scene("Witch")
	if button==$btn_aura: Global.goto_scene("Aura")
	if button==$btn_info: Global.goto_scene("Meaning")
	if button==$btn_config: Global.goto_scene("Settings")
	Global.btn_click_effect(button)
