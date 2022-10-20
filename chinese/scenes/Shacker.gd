extends Control

var center = null
var stick_start_y = null
var accel = Vector3()
var next = 7
var progress = 0
var active = true
signal complete_progress

func _ready():
	randomize()

func _process(delta):
	if !active: return
	if !center: center = rect_position
	if !stick_start_y: stick_start_y = $tx_stick.rect_position.y
	accel = Input.get_accelerometer() # -9 to +9
	if Input.is_action_pressed("ui_right"): accel.x = abs(next+1)
	if Input.is_action_pressed("ui_left"): accel.x = -abs(next-1)
	rect_position.y = center.y - accel.y / 9.8 * 50
	rect_position.x = center.x + accel.x / 9.8 * 200	
	if(next>0 && accel.x>next): 
		progress += 2
		$tx_stick.rect_rotation = 90 + randi()%20
		next = -abs(next)
	if(next<0 && accel.x<next): 
		progress += 2
		$tx_stick.rect_rotation = 90 - randi()%20
		next = abs(next)
	if progress>0: progress -=.03
	if progress >= 100: on_complete_progress()
	$tx_stick.rect_position.y = stick_start_y - progress

func on_complete_progress():
	active = false
	$tx_stick.rect_position.y = stick_start_y
	$tx_stick.rect_rotation = 90
	$Tween.interpolate_property($tx_stick,"rect_position",$tx_stick.rect_position,Vector2(-292,-509),.6,Tween.TRANS_QUAD,Tween.EASE_IN)
	$Tween.interpolate_property($tx_stick,"rect_rotation",$tx_stick.rect_rotation,0,.6,Tween.TRANS_QUAD,Tween.EASE_IN)
	$Tween.start()
	rect_position = center
	yield(get_tree().create_timer(1),"timeout")
	emit_signal("complete_progress")
