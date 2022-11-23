extends ColorRect

signal end_effect

func _ready():
	visible = true
#	fadeOut(.6)

func fadeIn(speed=.3):
	print("fadeIn")
	visible = true
	modulate.a = 0
	$Tween.interpolate_property(self,"modulate",Color(1,1,1,0),Color(1,1,1,.6),speed,Tween.TRANS_LINEAR,Tween.EASE_OUT)
	$Tween.start()
	yield($Tween,"tween_all_completed")
	emit_signal("end_effect")
	
func fadeOut(speed=.3):
	print("fadeOut")
	visible = true
	modulate.a = 1
	$Tween.interpolate_property(self,"modulate",Color(1,1,1,.6),Color(1,1,1,0),speed,Tween.TRANS_LINEAR,Tween.EASE_IN)
	$Tween.start()
	yield($Tween,"tween_all_completed")
	visible = false
	emit_signal("end_effect")
