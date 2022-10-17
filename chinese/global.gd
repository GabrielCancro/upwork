extends Node

var transition_scene = preload("res://nodes/Transition.tscn")
var current_scene
var options = { "sound":"on", "language":"en", "vibration":"on", "brightness":.7}
var selected_aura = 0
var SCENES = {
#	"Menu": preload("res://scenes/Menu.tscn"),
#	"Aura": preload("res://scenes/Aura.tscn"),
#	"Meaning": preload("res://scenes/Meaning.tscn"),
#	"Settings": preload("res://scenes/Settings.tscn"),
#	"Witch": preload("res://scenes/Witch.tscn"),
}
onready var MAIN = get_node("/root/Main")

func _ready():
#	goto_scene("Menu")
	pass

func goto_scene(name_scene):
	MAIN.get_node("Transition").fadeIn()
	yield(get_tree().create_timer(.3),"timeout")
	MAIN.get_node("Scene").get_child(0).queue_free()
	current_scene = SCENES[name_scene].instance()
	MAIN.get_node("Scene").add_child(current_scene)
	MAIN.get_node("Transition").fadeOut()

func btn_click_effect(node):
	MAIN.get_node("TweenBtnFx").interpolate_property(node,"modulate",Color(.5,.5,.5,1),Color(1,1,1,1),.3,Tween.TRANS_QUAD,Tween.EASE_OUT)
	MAIN.get_node("TweenBtnFx").start()
