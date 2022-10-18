extends Control

var state = "ready"

func _ready():
	randomize()
	$btn_back.connect("button_down",self,"onClick",[$btn_back])
	$btn_hold.connect("button_down",self,"onHoldDown")
	$btn_hold.connect("button_up",self,"onHoldUp")
	$Meaning.modulate.a = 0
	check_aura_selcted()

func check_aura_selcted():
	if Global.selected_aura == 0: return
	state = "stoped"
	$TextureText.visible = false
	$btn_hold.visible = false
	$Aura2.visible = false
	$Aura1.texture = load("res://assets/aura/aura_"+str(Global.selected_aura)+".png")
	$Meaning.texture = load("res://assets/meaning/meaning_color_"+str(Global.selected_aura-1)+".png")
	print("LOAD LOAD ","res://assets/meaning/meaning_text_"+str(Global.selected_aura-1)+"_"+Global.options.language+".png")
	$Meaning/Text_image.texture = load("res://assets/meaning/meaning_text_"+str(Global.selected_aura-1)+"_"+Global.options.language+".png")
	$Meaning.modulate.a = 1

func onClick(button):
	if button==$btn_back: Global.goto_scene("Menu")
	Global.btn_click_effect(button)

func onHoldDown():
	if state!="ready": return
	state = "changing"
	$ColorRect.modulate.a = 0
	$TextureText.visible = false
	$ColorRect.visible = true
	$Tween.interpolate_property($ColorRect,"modulate",Color(1,1,1,0),Color(1,1,1,.5),.2,Tween.TRANS_QUAD,Tween.EASE_IN)
	while state=="changing":
		$Aura1.texture = load("res://assets/aura/aura_"+str(Global.selected_aura)+".png")
		$Aura1.modulate.a = 1
		$Aura2.modulate.a = 0
		var rnd = randi()%6+1
		if rnd==Global.selected_aura: rnd = randi()%6+1
		Global.selected_aura = rnd
		$Tween.interpolate_property($Aura2,"modulate",Color(1,1,1,0),Color(1,1,1,1),.2,Tween.TRANS_QUAD,Tween.EASE_IN)
		$Tween.interpolate_property($Aura2,"rect_scale",Vector2(1.2,1.1),Vector2(1,1),.2,Tween.TRANS_QUAD,Tween.EASE_IN)
		$Tween.start()
		$Aura2.texture = load("res://assets/aura/aura_"+str(Global.selected_aura)+".png")
		if(Global.options.vibration=="on"): Input.vibrate_handheld(100)
		yield($Tween,"tween_all_completed")

func onHoldUp():
	if state!="changing": return
	state = "stoped"
	$Aura1.modulate.a = 0
	$Meaning.texture = load("res://assets/meaning/meaning_color_"+str(Global.selected_aura-1)+".png")
	$Meaning/Text_image.texture = load("res://assets/meaning/meaning_text_"+str(Global.selected_aura-1)+"_"+Global.options.language+".png")
	yield(get_tree().create_timer(.5),"timeout")
	$Tween.interpolate_property($Meaning,"modulate",Color(1,1,1,0),Color(1,1,1,1),.5,Tween.TRANS_QUAD,Tween.EASE_IN)
	$Tween.interpolate_property($Meaning,"rect_scale",Vector2(1.2,1.2),Vector2(1,1),.5,Tween.TRANS_QUAD,Tween.EASE_IN)
	$Tween.interpolate_property($ColorRect,"modulate",Color(1,1,1,.5),Color(1,1,1,0),1,Tween.TRANS_QUAD,Tween.EASE_IN)
	$Tween.start()
	yield($Tween,"tween_all_completed")
	$ColorRect.visible = false

func traduction():
	$btn_title.icon = load("res://assets/aura/aura_btn_aura_"+Global.options.language+".png")
	$TextureText.texture = load("res://assets/aura/aura_press_text_"+Global.options.language+".png")
	
