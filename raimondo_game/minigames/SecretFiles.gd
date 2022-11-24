extends Control

func _ready():
	$SearchPanel/LineEdit/btn_search.connect("button_down",self,"onSearchClick")
	$SearchingRect.connect("on_close_card",self,"onCloseCardClick")
	$SearchingRect.connect("on_contact_person",self,"onContactCardClick")
	Effector.transitionIn()
	$QuitPanel.connect("closed_panel",self,"onQuitPanel")

func onSearchClick():
	var val = $SearchPanel/LineEdit.text
	$SearchingRect.searchAndShowCard(val)

func onCloseCardClick():
	$SearchingRect.visible = false

func onContactCardClick(val):
	if(Global.CURRENT_MINIGAME=="CASAINCENTRO"): Global.MINIGAME_CASAINCENTRO_COMPLETED = true
	if(Global.CURRENT_MINIGAME=="TELEPHONE"): Global.MINIGAME_TELEPHONE_COMPLETED = true
	Global.CURRENT_MINIGAME = null
	get_tree().change_scene("res://scenes/Main1.tscn")

func onQuitPanel(val):
	if val=="YES": 
		Global.CURRENT_MINIGAME = null
		get_tree().change_scene("res://scenes/Main1.tscn")
