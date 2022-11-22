extends Control

func _ready():
	$VideoPlayer.connect("finished",self,"onFinishedVideo")
	$btn_search/btn_skip.connect("button_down",self,"onFinishedVideo")

func onFinishedVideo():
	get_tree().change_scene("res://scenes/Intro.tscn")
