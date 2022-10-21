extends Node

var transition_scene = preload("res://nodes/Transition.tscn")
var current_scene
var options = { "sound":"on", "language":"en", "vibration":"on"}
var selected_aura = 0
var SCENES = {
	"Menu": preload("res://scenes/Menu.tscn"),
	"Gameplay1": preload("res://scenes/Gameplay1.tscn"),
	"Settings": preload("res://scenes/Settings.tscn"),
}
var SOUNDS = {
}
var music_seek = 0
onready var MAIN = get_node("/root/Main")

func _ready():
	load_store_data()
	goto_scene("Menu")
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
	MAIN.get_node("ASP_music").seek(music_seek)

func stop_sounds(): 
	music_seek = MAIN.get_node("ASP_music").get_playback_position();
	MAIN.get_node("ASP_music").stop()

#func play_sfx(id_sound):
#	return
#	if(options.sound != "on"): return
#	(MAIN.get_node("ASP_sfx") as AudioStreamPlayer).stream = SOUNDS[id_sound]
#	MAIN.get_node("ASP_sfx").play()

func save_store_data():
	var file = File.new()
	file.open("user://store_app_data.res", File.WRITE)
	file.store_string(var2str(options))
	file.close()
	print("SAVE ",options)

func load_store_data():      
	var file = File.new()
	file.open("user://store_app_data.res", File.READ)
	var loaded_data = str2var(file.get_as_text())
	file.close()
	if(loaded_data && loaded_data.size()!=options.size()): loaded_data = null
	if(!loaded_data): 
		loaded_data = options
		save_store_data()
	options = loaded_data
