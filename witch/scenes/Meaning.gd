extends Control

func _ready():
	$btn_back.connect("button_down",self,"onClick",[$btn_back])

func onClick(button):
	if button==$btn_back: Global.goto_scene("Menu")
	Global.btn_click_effect(button)

func traduction():
	$btn_title.icon = load("res://assets/meaning/meaning_btn_title_"+Global.options.language+".png")
	for node in $VBox.get_children():
		node.get_node("Text_image").texture = load("res://assets/meaning/meaning_text_"+str(node.get_index())+"_"+Global.options.language+".png")
