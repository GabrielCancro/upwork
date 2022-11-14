extends Control

var current_page = 1

# Called when the node enters the scene tree for the first time.
func _ready():
	$Page1/btn_next.connect("button_down",self,"onNextClick",[])
	$Page2/btn_back.connect("button_down",self,"onBackClick",[])
	for btn in $Page2/Text2/Grid.get_children(): 
		btn.text = ""
		btn.connect("button_down",self,"onGridClick",[btn,btn.get_index()])

func onNextClick():
	changePage(2)

func onBackClick():
	changePage(1)

func onGridClick(btn,index):
	if btn.text == "": btn.text = "X"
	else: btn.text = ""

func changePage(id):
	$Transition.fadeIn(.1)
	yield($Transition,"end_effect")
	get_node("Page"+str(current_page)).visible = false
	current_page = id
	get_node("Page"+str(current_page)).visible = true
	$Transition.fadeOut(.1)
	yield($Transition,"end_effect")
