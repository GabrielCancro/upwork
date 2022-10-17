extends ColorRect

func _ready():
	fadeOut(.6)

func fadeIn(tm=.3):
	visible=true
	$Tween.interpolate_property(self,"modulate",Color(1,1,1,0),Color(1,1,1,1),tm,Tween.TRANS_QUAD,Tween.EASE_IN)
	$Tween.start()

func fadeOut(tm=.4):
	$Tween.interpolate_property(self,"modulate",Color(1,1,1,1),Color(1,1,1,0),tm,Tween.TRANS_QUAD,Tween.EASE_OUT)
	$Tween.start()
	yield($Tween,"tween_completed")
	visible=false
