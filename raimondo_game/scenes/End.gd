extends Control

func _ready():
	$btn_end/Label.text = "Interroga "+Global.INTERROGA
	$btn_end.connect("button_down",self,"onEndClick")
	Effector.transitionIn()

func onEndClick():
	get_tree().quit()
