extends Control

var state = "stoped"

func _ready():
	Global.init_scene(name)
	randomize()
	$btn_back.connect("button_down",self,"onClick",[$btn_back])
	$btn_hold.connect("button_down",self,"onHoldDown")
	$btn_hold.connect("button_up",self,"onHoldUp")

func _process(delta):
	if state=="changing":
		var i = randi()%6+1
		$TextureBody1.texture = load("res://assets/aura/aura_"+str(i)+".png")

func onClick(button):
	if button==$btn_back: Global.goto_scene("Main")
	Global.btn_click_effect(button)

func onHoldDown():
	print("DOWN")
	state = "changing"

func onHoldUp():
	print("UP")
	state = "stoped"
