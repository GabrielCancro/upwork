extends CanvasLayer

onready var Ship = get_node("/root/Lunar/Ship")

func _ready():
	$btn_start.connect("button_down",self,"onClickStart")
	Ship.connect("destroy",self,"onLose")
	Ship.connect("victory",self,"onWin")

func _process(delta):
	$lbl_info.text = "velX " + str( floor( Ship.velocity.x * 10 ) )
	$lbl_info.text += "\nvelY " + str( floor( Ship.velocity.y * 10 ) )
	$lbl_info.text += "\nfuel " + str( floor( Ship.fuel ) )
	$lbl_info.text += "\nvvv " + str( floor( Ship.velocity.length() ) )

func onClickStart():
	$btn_start.visible = false
	$lbl_end.visible = false
	Ship.resetAndPlay()

func onLose():
	$end_panel/lbl_end.text = "YOU LOSE"
	$end_panel.visible = true
	$btn_start.text = "TRY AGAIN"
	$btn_start.visible = true

func onWin():
	$end_panel/lbl_end.text = "YOU WIN"
	$end_panel.visible = true
	$btn_start.text = "PLAY AGAIN"
	$btn_start.visible = true
