extends Node

var transition_scene = preload("res://nodes/Transition.tscn")
var current_scene
var transition_node
var tween_node
var options = { "sound":"on", "language":"en", "vibration":"on", "brightness":.7}
var selected_aura = 0

# Called when the node enters the scene tree for the first time.
func _ready():
	pass

func init_scene(name_scene):
	current_scene = get_node("/root/"+name_scene)
	transition_node = transition_scene.instance()
	current_scene.add_child(transition_node)
	tween_node = Tween.new()
	current_scene.add_child(tween_node)

func goto_scene(name_scene):
	transition_node.fade()
	yield(get_tree().create_timer(.3),"timeout")
	get_tree().change_scene("res://scenes/"+name_scene+".tscn")

func btn_click_effect(node):
	tween_node.interpolate_property(node,"modulate",Color(.5,.5,.5,1),Color(1,1,1,1),.3,Tween.TRANS_QUAD,Tween.EASE_OUT)
	tween_node.start()
