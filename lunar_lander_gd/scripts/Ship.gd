extends KinematicBody2D

var gravity = 0.2
var propulsion = 0.4
var velocity = Vector2()
var stable = "false"

# Called when the node enters the scene tree for the first time.
func _ready():
	$Area2D.connect("body_entered",self,"onContact")


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	velocity.y += gravity
	velocity = move_and_slide(velocity,Vector2.UP)
	controlls()
	raycastCheck()

func controlls():
	if Input.is_action_pressed("ui_left"):
		velocity.x -= propulsion
	if Input.is_action_pressed("ui_right"):
		velocity.x += propulsion
	if Input.is_action_pressed("ui_up"):
		velocity.y -= propulsion

func raycastCheck():
	$RayLeft.force_raycast_update()
	$RayRight.force_raycast_update()
	stable = ( $RayLeft.is_colliding() && $RayRight.is_colliding() )

func onContact(body):
	print("CONTACT TO "+body.name)
	print("STABLE? ",stable)
