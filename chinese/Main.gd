extends Control


# Declare member variables here. Examples:
# var a = 2
# var b = "text"


# Called when the node enters the scene tree for the first time.
func _ready():
	pass # Replace with function body.


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	var accel = Input.get_accelerometer()
	$Label.text = "x: "+str(floor(accel.x*10))
	$Label.text += "\ny: "+str(floor(accel.y*10))
	$Label.text += "\nz: "+str(floor(accel.z*10))
	
	$Icon.position.y = 360 - accel.y / 9.8 * 300
	$Icon.position.x = 360 + accel.x / 9.8 * 300
