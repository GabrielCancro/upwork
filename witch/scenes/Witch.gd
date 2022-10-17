extends Control

const MAX_CHARACTERS = 200
var last_text = ""

func _ready():
	$AnimationPlayer.play("witch")
	$btn_back.connect("button_down",self,"onClick",[$btn_back])
	$btn_papper.connect("button_down",self,"onClickPapper")
	$popUp/enterDesire/btn_popup_done.connect("button_down",self,"onPopupDone")
	$popUp/enterDesire/TextEdit.connect("text_changed",self,"onWrite")
	$popUp.visible = false

func onWrite():
	print("write ",$popUp/enterDesire/TextEdit.text.length())
	if($popUp/enterDesire/TextEdit.text.length()>MAX_CHARACTERS):
		$popUp/enterDesire/TextEdit.text = last_text
		$popUp/enterDesire/TextEdit.cursor_set_line(9999)
		$popUp/enterDesire/TextEdit.cursor_set_column(9999)
	last_text = $popUp/enterDesire/TextEdit.text

func onClick(button):
	if button==$btn_back: Global.goto_scene("Menu")
	Global.btn_click_effect(button)

func onClickPapper():
	$popUp.visible = true
	$popUp/Tween.interpolate_property($popUp,"modulate",Color(1,1,1,0),Color(1,1,1,1),.2,Tween.TRANS_QUAD,Tween.EASE_IN)
	$popUp/Tween.interpolate_property($popUp/enterDesire,"rect_scale",Vector2(.7,.7),Vector2(1,1),.2,Tween.TRANS_QUAD,Tween.EASE_IN)
	$popUp/Tween.start()

func onPopupDone():
	$popUp/Tween.interpolate_property($popUp,"modulate",Color(1,1,1,1),Color(1,1,1,0),.2,Tween.TRANS_QUAD,Tween.EASE_IN)
	$popUp/Tween.interpolate_property($popUp/enterDesire,"rect_scale",Vector2(1,1),Vector2(.7,.7),.2,Tween.TRANS_QUAD,Tween.EASE_IN)
	$popUp/Tween.start()
	yield($popUp/Tween,"tween_all_completed")
	$popUp.visible = false
