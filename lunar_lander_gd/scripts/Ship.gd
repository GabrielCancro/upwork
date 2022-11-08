extends KinematicBody2D

var velocity = Vector2()
var fuel = 0
var stable = "false"
var active = false
onready var start_pos = position
signal destroy
signal victory

func _ready():
	randomize()
	fuel = GlobalConfig.start_fuel
	$Area2D.connect("body_entered",self,"onContact")
	get_node("/root/Lunar").remove_child( get_node("/root/Lunar/Camera2D") )
	add_child( get_node("/root/Lunar/Camera2D") )

func resetAndPlay():
	position = start_pos
	velocity = Vector2()
	fuel = GlobalConfig.start_fuel
	stable = "false"
	active = true
	$Sprite.modulate = Color(1,1,1,1)
	$Sprite.scale = Vector2(1,1)

func _process(delta):
	var z = 1 + velocity.length()/1000
	$Camera2D.zoom = Vector2(z,z)
	if !active: return
	prop_fx()
	velocity.y += GlobalConfig.gravity
	velocity = move_and_slide(velocity,Vector2.UP)
	controlls()
	raycastCheck()

func controlls():
	$prop_down.visible = false
	$prop_left.visible = false
	$prop_right.visible = false
	if Input.is_action_pressed("ui_left"):
		velocity.x -= GlobalConfig.propulsion
		$prop_right.visible = true
		fuel -= .1
	if Input.is_action_pressed("ui_right"):
		velocity.x += GlobalConfig.propulsion
		$prop_left.visible = true
		fuel -= .1
	if Input.is_action_pressed("ui_up"):
		velocity.y -= GlobalConfig.propulsion
		$prop_down.visible = true
		fuel -= .1

func raycastCheck():
	$RayLeft.force_raycast_update()
	$RayRight.force_raycast_update()
	stable = ( $RayLeft.is_colliding() && $RayRight.is_colliding() )

func onContact(body):
	active = false
	$prop_down.visible = false
	$prop_left.visible = false
	$prop_right.visible = false
	if(stable && velocity.length()<GlobalConfig.max_speed_to_land): 
		yield(get_tree().create_timer(1),"timeout")
		emit_signal("victory")
	else: 
		$Tween.interpolate_property($Sprite,"modulate",Color(1,1,1,1),Color(1,1,1,0),.3,Tween.TRANS_EXPO,Tween.EASE_OUT)
		$Tween.interpolate_property($Sprite,"scale",$Sprite.scale,Vector2(2,2),.3,Tween.TRANS_EXPO,Tween.EASE_OUT)
		$Tween.start()
		yield(get_tree().create_timer(1),"timeout")
		emit_signal("destroy")
	

func prop_fx():
	$prop_down.scale.x = .1+randf()*.2
	$prop_down.scale.y = .15+randf()*.3
	$prop_left.scale.x = .3+randf()*.2
	$prop_left.scale.y = .15+randf()*.2
	$prop_right.scale.x = .3+randf()*.2
	$prop_right.scale.y = .15+randf()*.2
