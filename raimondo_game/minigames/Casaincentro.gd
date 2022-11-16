extends Control

func _ready():
	$ScrollContainer/TextureRect/AnimationPlayer.play("Logo_shine")
	$ScrollContainer/TextureRect/LineEdit.connect("text_changed",self,"onChangeLineEdit")
	pass

func onChangeLineEdit(text):
	text = text.to_upper().replace(" ","")
	print(text)
	if(text=="CRISTIANOCATENA"): $SearchingRect.searchAndShowCard(text)
