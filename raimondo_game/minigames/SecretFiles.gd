extends Control

var CARDS = {
	"3269737658": preload("res://assets/secret_files_game1/files/3269737658.PNG"),
}


# Called when the node enters the scene tree for the first time.
func _ready():
	$SearchPanel/LineEdit/btn_search.connect("button_down",self,"onSearchClick")
	pass # Replace with function body.

func onSearchClick():
	var val = $SearchPanel/LineEdit.text.to_upper().replace(" ","")
	if(val in CARDS): print("SHOW CARD "+val)
