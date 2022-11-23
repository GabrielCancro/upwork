extends Control

func _ready():
	$VideoPlayer.connect("finished",self,"onFinishedVideo")
	$btn_search/btn_skip.connect("button_down",self,"onFinishedVideo")
	$btn_start.connect("button_down",self,"onStartClick")
	Effector.transitionIn()

func onStartClick():
	$btn_start.visible = false
	$VideoPlayer.play()
	showSkipButton()

func onFinishedVideo():
	Effector.changeSceneTransition("res://scenes/Intro.tscn")

func showSkipButton():
	yield(get_tree().create_timer(2),"timeout")
	Effector.fadeInNode($btn_search)
