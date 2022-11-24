extends Control

var started = false

func _ready():
	$VideoPlayer.connect("finished",self,"onFinishedVideo")
	$btn_search/btn_skip.connect("button_down",self,"onFinishedVideo")
	$btn_replay/btn.connect("button_down",self,"onReplayClick")
	$btn_start.connect("button_down",self,"onStartClick")
	Effector.transitionIn()
	GlobalMusic.playing = false
	
	yield(get_tree().create_timer(4),"timeout")
	onStartClick()

func onStartClick():
	if started: return
	started = true
	Effector.fadeOutNode($btn_start)
	$VideoPlayer.play()
	showSkipButton()

func onFinishedVideo():
	Effector.changeSceneTransition("res://scenes/Main1.tscn")

func showSkipButton():
	yield(get_tree().create_timer(2),"timeout")
	Effector.fadeInNode($btn_search)
	Effector.fadeInNode($btn_replay)

func onReplayClick():
	$VideoPlayer.stop()
	$VideoPlayer.play()
