extends Control


# Declare member variables here. Examples:
# var a = 2
# var b = "text"


# Called when the node enters the scene tree for the first time.
func _ready():
	$btn_minigame1/Button.connect("button_down",self,"onClickMinigame1")
	$btn_minigame2/Button.connect("button_down",self,"onClickMinigame2")

func onClickMinigame1():
	get_tree().change_scene("res://minigames/TelephoneRecordsMinigame.tscn")

func onClickMinigame2():
	get_tree().change_scene("res://minigames/Casaincentro.tscn")
