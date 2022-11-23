extends Control

func _ready():
	$VideoPlayer.connect("finished",self,"onFinishedVideo")
	$btn_search/btn_skip.connect("button_down",self,"onFinishedVideo")
	Effector.transitionIn()
	showSkipButton()

func onFinishedVideo():
	Global.INTERROGATION2_VIEWED = true
	Effector.changeSceneTransition("res://scenes/Main1.tscn")

func showSkipButton():
	yield(get_tree().create_timer(2),"timeout")
	Effector.fadeInNode($btn_search)
