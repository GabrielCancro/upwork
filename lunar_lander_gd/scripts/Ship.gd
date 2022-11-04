extends KinematicBody2D

var gravity = 0.2
var propulsion = 0.4
var velocity = Vector2()
var fuel = 250
var stable = "false"
var active = false
onready var start_pos = position
signal destroy
signal victory

func _ready():
	$Area2D.connect("body_entered",self,"onContact")

func resetAndPlay():
	position = start_pos
	velocity = Vector2()
	fuel = 250
	stable = "false"
	active = true

func _process(delta):
	if !active: return
	velocity.y += gravity
	velocity = move_and_slide(velocity,Vector2.UP)
	controlls()
	raycastCheck()

func controlls():
	if Input.is_action_pressed("ui_left"):
		velocity.x -= propulsion
		fuel -= .1
	if Input.is_action_pressed("ui_right"):
		velocity.x += propulsion
		fuel -= .1
	if Input.is_action_pressed("ui_up"):
		velocity.y -= propulsion
		fuel -= .1

func raycastCheck():
	$RayLeft.force_raycast_update()
	$RayRight.force_raycast_update()
	stable = ( $RayLeft.is_colliding() && $RayRight.is_colliding() )

func onContact(body):
	print("CONTACT TO "+body.name)
	print("STABLE? ",stable)
	active = false
	if(stable && velocity.length()<15): emit_signal("victory")
	else: emit_signal("destroy")
