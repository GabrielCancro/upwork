extends Control

func _ready():
	Global.init_scene(name)
	$btn_back.connect("button_down",self,"onClick",[$btn_back])

func onClick(button):
	if button==$btn_back: Global.goto_scene("Main")
	Global.btn_click_effect(button)

