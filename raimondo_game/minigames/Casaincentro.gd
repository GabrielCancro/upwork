extends Control

func _ready():
	$ScrollContainer/TextureRect/AnimationPlayer.play("Logo_shine")
	$ScrollContainer/TextureRect/LineEdit.connect("text_changed",self,"onChangeLineEdit")
	$btn_search/btn_search.connect("button_down",self,"onClickSearch")
	$QuitPanel.connect("closed_panel",self,"onQuitPanel")
	Global.CURRENT_MINIGAME = "CASAINCENTRO"
	Effector.transitionIn()

func onChangeLineEdit(text):
	text = text.to_upper().replace(" ","")
	print(text)
	if(text=="CRISTIANOCATENA"): 
		$btn_search.visible = true
		$ScrollContainer/TextureRect/LineEdit.editable = false

func onClickSearch():
	get_tree().change_scene("res://minigames/SecretFiles.tscn")

func onQuitPanel(val):
	if val=="YES": 
		Global.CURRENT_MINIGAME = null
		get_tree().change_scene("res://scenes/Main1.tscn")
