extends Node

var transition_scene = preload("res://nodes/Transition.tscn")
var current_scene
var options = { "sound":"on", "language":"en", "vibration":"on", "brightness":.7}
var selected_aura = 0
var SCENES = {
	"Menu": preload("res://scenes/Menu.tscn"),
	"Aura": preload("res://scenes/Aura.tscn"),
	"Meaning": preload("res://scenes/Meaning.tscn"),
	"Settings": preload("res://scenes/Settings.tscn"),
	"Witch": preload("res://scenes/Witch.tscn"),
}
var SOUNDS = {
	"done": preload("res://assets/sfx/done.mp3"),
	"paper": preload("res://assets/sfx/paper.mp3")
}
onready var MAIN = get_node("/root/Main")

func _ready():
	goto_scene("Menu")
	load_store_data()
	play_music()

func goto_scene(name_scene):
	MAIN.get_node("Transition").fadeIn()
	yield(get_tree().create_timer(.3),"timeout")
	MAIN.get_node("Scene").get_child(0).queue_free()
	current_scene = SCENES[name_scene].instance()
	MAIN.get_node("Scene").add_child(current_scene)
	if(current_scene.has_method("traduction")): current_scene.traduction()	
	MAIN.get_node("Transition").fadeOut()

func btn_click_effect(node):
	MAIN.get_node("TweenBtnFx").interpolate_property(node,"modulate",Color(.5,.5,.5,1),Color(1,1,1,1),.3,Tween.TRANS_QUAD,Tween.EASE_OUT)
	MAIN.get_node("TweenBtnFx").start()

func play_music():
	if(options.sound != "on"): return
	MAIN.get_node("ASP_music").play()

func stop_sounds():
	MAIN.get_node("ASP_music").stop()
	MAIN.get_node("ASP_sfx").stop()

func play_sfx(id_sound):
	if(options.sound != "on"): return
	(MAIN.get_node("ASP_sfx") as AudioStreamPlayer).stream = SOUNDS[id_sound]
	MAIN.get_node("ASP_sfx").play()

func save_store_data():
	var file = File.new()
	file.open("user://store_app_data.res", File.WRITE)
	file.store_string(var2str(options))
	file.close()

func load_store_data():      
	var file = File.new()
	file.open("user://store_app_data.res", File.READ)
	var loaded_data = str2var(file.get_as_text())
	file.close()
	if(!loaded_data): 
		loaded_data = options
		save_store_data()
	options = loaded_data
