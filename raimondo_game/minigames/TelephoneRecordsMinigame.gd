extends Control

var current_page = 1

# Called when the node enters the scene tree for the first time.
func _ready():
	$Page1/btn_next.connect("button_down",self,"onNextClick",[])
	$Page2/btn_back.connect("button_down",self,"onBackClick",[])
	$Page2/btn_search/btn_search.connect("button_down",self,"onSearchClick",[])
	Effector.transitionIn()
	for btn in $Page2/Text2/Grid.get_children(): 
#		btn.text = ""
		btn.connect("button_down",self,"onGridClick",[btn,btn.get_index()])

func onNextClick():
	changePage(2)

func onBackClick():
	changePage(1)

func onSearchClick():
	Global.MINIGAME_TELEPHONE_COMPLETED = true
	get_tree().change_scene("res://minigames/SecretFiles.tscn")

func onGridClick(btn,index):
	if btn.text == "": btn.text = "X"
	else: btn.text = ""
	checkCorrectDiagram()

func changePage(id):
	Effector.fadeOutNodeFast( get_node("Page"+str(current_page) ) )
	Effector.fadeInNodeFast( get_node("Page"+str(id) ) )
	yield(Effector,"end_effect")
	current_page = id

func checkCorrectDiagram():
	var correct = "btn5-btn10-btn26-btn31-btn45-btn47-btn60-btn66-btn79-"
	var res = ""
	for btn in $Page2/Text2/Grid.get_children(): if btn.text=="X": res += btn.name+"-"
	if res==correct: 
		$Page2/btn_search.visible = true
		$Page2/Text2/block_rect.visible = true
