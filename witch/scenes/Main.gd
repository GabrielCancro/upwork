extends Control

var inactive = false

# Called when the node enters the scene tree for the first time.
func _ready():
	$btn_start.connect("button_down",self,"onClick",[$btn_start])
	$btn_aura.connect("button_down",self,"onClick",[$btn_aura])
	$btn_info.connect("button_down",self,"onClick",[$btn_info])
	$btn_config.connect("button_down",self,"onClick",[$btn_config])

func onClick(button):
	if(inactive): return
	inactive = true
	if button==$btn_start: $Transition.change_scene("asd")
	$Tween.interpolate_property(button,"modulate",Color(.5,.5,.5,1),Color(1,1,1,1),.3,Tween.TRANS_QUAD,Tween.EASE_OUT)
	$Tween.start()
	yield($Tween,"tween_completed")
	inactive = false
