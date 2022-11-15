extends Control

var CARDS = {
	"3269737658": "res://assets/secret_files_game1/files/3269737658.PNG",
	"3452328537": "res://assets/secret_files_game1/files/3452328537.PNG",
	"3759632434": "res://assets/secret_files_game1/files/3759632434.PNG",
	"3922775332": "res://assets/secret_files_game1/files/3922775332.PNG",
	"AF438TZ": "res://assets/secret_files_game1/files/AF438TZ.PNG",
	"BENEDETTAGREEN": "res://assets/secret_files_game1/files/BENEDETTAGREEN.PNG",
	"CRISTIANOCATENA": "res://assets/secret_files_game1/files/CRISTIANOCATENA.PNG",
	"DA357BR": "res://assets/secret_files_game1/files/DA357BR.PNG",
	"EA276JG": "res://assets/secret_files_game1/files/EA276JG.PNG",
	"EF816MN": "res://assets/secret_files_game1/files/EF816MN.PNG",
	"FRANCESCABIANCHI": "res://assets/secret_files_game1/files/FRANCESCABIANCHI.PNG",
	"GIOVANNIBARONE": "res://assets/secret_files_game1/files/GIOVANNIBARONE.PNG",
	"LILIANABRUNO": "res://assets/secret_files_game1/files/LILIANABRUNO.PNG",
	"LUCAESPOSITO": "res://assets/secret_files_game1/files/LUCAESPOSITO.PNG",
	"LUISORTEGA": "res://assets/secret_files_game1/files/LUISORTEGA.PNG",
	"MANUELORTEGA": "res://assets/secret_files_game1/files/MANUELORTEGA.PNG",
	"MARTALONGO": "res://assets/secret_files_game1/files/MARTALONGO.PNG",
	"VECCHIOEBELLO": "res://assets/secret_files_game1/files/VECCHIOEBELLO.PNG",
	"NONE": "res://assets/secret_files_game1/files/Nontrovato.PNG",
}

func _ready():
	$SearchPanel/LineEdit/btn_search.connect("button_down",self,"onSearchClick")
	$SearchingRect/ResultCard/btn_close_card.connect("button_down",self,"onCloseCardClick")
	pass # Replace with function body.

func onSearchClick():
	$SearchingRect.visible = true
	$SearchingRect.modulate.a = 0
	$SearchingRect/ResultCard.visible = false
	$SearchingRect/Tween.interpolate_property($SearchingRect,"modulate",Color(1,1,1,0),Color(1,1,1,1),.3,Tween.TRANS_LINEAR,Tween.EASE_OUT)
	$SearchingRect/Tween.start()
	yield(get_tree().create_timer(2),"timeout")
	var val = $SearchPanel/LineEdit.text.to_upper().replace(" ","")
	if(!val in CARDS): val = "NONE"
	$SearchingRect/ResultCard/CardImage.texture = load(CARDS[val])
	$SearchingRect/ResultCard.visible = true
	$SearchingRect/ResultCard.modulate.a = 0
	$SearchingRect/Tween.interpolate_property($SearchingRect/ResultCard,"modulate",Color(1,1,1,0),Color(1,1,1,1),.3,Tween.TRANS_LINEAR,Tween.EASE_OUT)
	$SearchingRect/Tween.start()

func onCloseCardClick():
	$SearchingRect.visible = false
