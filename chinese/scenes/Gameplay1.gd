extends Control


func _ready():
	randomize()
	$Popup.visible = false
	$Popup/Card/btn_reset.connect("button_down",self,"onClick",[$Popup/Card/btn_reset])
	$Shacker.connect("complete_progress",self,"show_fortune")

func onClick(button):
	if button==$Popup/Card/btn_reset: Global.goto_scene("Menu")
	Global.btn_click_effect(button)

func _process(delta):
	if Input.is_action_just_pressed("ui_accept"):
		Global.goto_scene("Menu")
	if Input.is_action_just_pressed("ui_down"):
		show_fortune()
	$Label.text=str($Shacker.progress)

func traduction():
	$tx_text.texture = load("res://assets/gameplay/gameplay_shake_"+Global.options.language+".png")

func show_fortune():
	var i = randi()%20
	$Popup/Card/lb_num.text = str(i+1)
	$Popup/Card/lb_desc.text = FortuneData.DESC[Global.options.language][i]
	$Popup.modulate.a = 0
	$Popup.visible = true
	$Tween.interpolate_property($Popup,"modulate",Color(1,1,1,0),Color(1,1,1,1),.2,Tween.TRANS_QUAD,Tween.EASE_IN)
	$Tween.interpolate_property($Popup/Card,"rect_scale",Vector2(.7,.7),Vector2(1,1),.2,Tween.TRANS_QUAD,Tween.EASE_IN)
	$Tween.start()
