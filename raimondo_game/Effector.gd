extends Node

var TransitionEffector
var TweenEffector
var speed = .6
signal end_effect

# Called when the node enters the scene tree for the first time.
func _ready():
	pass # Replace with function body.

func check_effector_nodes():
	if(!get_tree().get_current_scene().get_node_or_null("TransitionEffector")):
		TransitionEffector = preload("res://nodes/Transition.tscn").instance()
		TransitionEffector.name = "TransitionEffector"
		get_tree().get_current_scene().add_child(TransitionEffector)
	if(!get_tree().get_current_scene().get_node_or_null("TweenEffector")):
		TweenEffector = Tween.new()
		TweenEffector.name = "TweenEffector"
		get_tree().get_current_scene().add_child(TweenEffector)
		
func transitionIn():
	check_effector_nodes()
	TransitionEffector.fadeOut()

func transitionInSlow():
	check_effector_nodes()
	TransitionEffector.fadeOut(1)

func transitionOut():
	check_effector_nodes()
	TransitionEffector.fadeIn()

func fadeInNode(node):
	check_effector_nodes()
	print("fadeInNode ",node.name)
	node.visible = true
	node.modulate.a = 0
	TweenEffector.interpolate_property(node,"modulate",Color(1,1,1,.3),Color(1,1,1,1),speed,Tween.TRANS_LINEAR,Tween.EASE_IN)
	TweenEffector.start()
	yield(TweenEffector,"tween_all_completed")
	emit_signal("end_effect")

func fadeOutNode(node):
	check_effector_nodes()
	print("fadeOutNode ",node.name)
	TweenEffector.interpolate_property(node,"modulate",Color(1,1,1,node.modulate.a),Color(1,1,1,0),speed,Tween.TRANS_LINEAR,Tween.EASE_IN)
	TweenEffector.start()
	yield(TweenEffector,"tween_all_completed")
	node.visible = false
	emit_signal("end_effect")

func fadeOutNodeFast(node):
	var last_speed = speed
	speed = .3
	fadeOutNode(node)
	speed = last_speed

func fadeInNodeFast(node):
	var last_speed = speed
	speed = .3
	fadeInNode(node)
	speed = last_speed
	
func changeSceneTransition(scene_path):
	transitionOut()
	yield(TransitionEffector,"end_effect")
	if(TransitionEffector): TransitionEffector.queue_free()
	if(TweenEffector): TweenEffector.queue_free()
	get_tree().change_scene(scene_path)
