extends Control

func _ready():
	$SearchPanel/LineEdit/btn_search.connect("button_down",self,"onSearchClick")
	$SearchingRect.connect("on_close_card",self,"onCloseCardClick")

func onSearchClick():
	var val = $SearchPanel/LineEdit.text
	$SearchingRect.searchAndShowCard(val)

func onCloseCardClick():
	$SearchingRect.visible = false
