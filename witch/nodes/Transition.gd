extends ColorRect

func _ready():
	$Tween.interpolate_property(self,"modulate",Color(1,1,1,1),Color(1,1,1,0),.4,Tween.TRANS_QUAD,Tween.EASE_OUT)
	$Tween.start()
	yield($Tween,"tween_completed")
	visible=false

func fade():
	visible=true
	$Tween.interpolate_property(self,"modulate",Color(1,1,1,0),Color(1,1,1,1),.3,Tween.TRANS_QUAD,Tween.EASE_IN)
	$Tween.start()
