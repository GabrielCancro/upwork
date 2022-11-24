extends Control

enum OPTIONS { toQuit,toReturn }
export(OPTIONS) var Message = OPTIONS.toQuit
signal closed_panel(value)

func _ready():
	$btn_quit.connect("button_down",self,"onClickX")
	$Panel/SubPanel/btn_yes.connect("button_down",self,"onClickYes")
	$Panel/SubPanel/btn_no.connect("button_down",self,"onClickNo")
	$Panel.visible = false
	if Message == OPTIONS.toQuit: $Panel/SubPanel/Label.text = "sei sicuro di uscire?"
	if Message == OPTIONS.toReturn: $Panel/SubPanel/Label.text = "vuoi tornare al gioco principale?"

func onClickX():
	Effector.fadeInNodeFast($Panel)

func onClickYes():
	Effector.fadeOutNodeFast($Panel)
	emit_signal("closed_panel","YES")

func onClickNo():
	emit_signal("closed_panel","NO")
	Effector.fadeOutNodeFast($Panel)
