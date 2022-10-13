extends Control

var inactive = true

# Called when the node enters the scene tree for the first time.
func _ready():
	$btn_back.connect("button_down",self,"onClick",[$btn_back])
	yield(get_tree().create_timer(.35),"timeout")
	inactive = false

func onClick(button):
	if(inactive): return
	inactive = true
	if button==$btn_back: $Transition.change_scene("Main")
	$Tween.interpolate_property(button,"modulate",Color(.5,.5,.5,1),Color(1,1,1,1),.3,Tween.TRANS_QUAD,Tween.EASE_OUT)
	$Tween.start()
	yield($Tween,"tween_completed")
	inactive = false
