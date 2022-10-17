extends Control

func _ready():
	$btn_back.connect("button_down",self,"onClick",[$btn_back])

func onClick(button):
	if button==$btn_back: Global.goto_scene("Menu")
	Global.btn_click_effect(button)

