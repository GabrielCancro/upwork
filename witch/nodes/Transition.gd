extends ColorRect


# Declare member variables here. Examples:
# var a = 2
# var b = "text"


# Called when the node enters the scene tree for the first time.
func _ready():
	$Tween.interpolate_property(self,"modulate",Color(1,1,1,1),Color(1,1,1,0),.5,Tween.TRANS_QUAD,Tween.EASE_OUT)
	$Tween.start()
	yield($Tween,"tween_completed")
	visible=false

func change_scene(name):
	visible=true
	$Tween.interpolate_property(self,"modulate",Color(1,1,1,0),Color(1,1,1,1),.3,Tween.TRANS_QUAD,Tween.EASE_IN)
	$Tween.start()
	yield($Tween,"tween_completed")
	get_tree().change_scene("res://scenes/Main.tscn")
	print("CHANGE SCENE")
