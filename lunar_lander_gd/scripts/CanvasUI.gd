extends CanvasLayer

onready var Ship = get_node("/root/Lunar/Ship")


# Called when the node enters the scene tree for the first time.
func _ready():
	pass # Replace with function body.


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	$Label.text = "velX " + str( floor( Ship.velocity.x * 10 ) )
	$Label.text += "\nvelY " + str( floor( Ship.velocity.y * 10 ) )
