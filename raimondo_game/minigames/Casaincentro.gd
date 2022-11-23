extends Control

func _ready():
	$ScrollContainer/TextureRect/AnimationPlayer.play("Logo_shine")
	$ScrollContainer/TextureRect/LineEdit.connect("text_changed",self,"onChangeLineEdit")
	$btn_search/btn_search.connect("button_down",self,"onClickSearch")
	Effector.transitionIn()

func onChangeLineEdit(text):
	text = text.to_upper().replace(" ","")
	print(text)
	if(text=="CRISTIANOCATENA"): 
		$btn_search.visible = true
		$ScrollContainer/TextureRect/LineEdit.editable = false

func onClickSearch():
	Global.MINIGAME_CASAINCENTRO_COMPLETED = true
	get_tree().change_scene("res://minigames/SecretFiles.tscn")
