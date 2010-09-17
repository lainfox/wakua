<?php
class imageShack
{

	public function setURL($url){
		$this->url = $url;
		return $url;
	}

	private function validarURL($url){
		if(!preg_match("/http:\/{2}/i",$url)) die("URL invalid!");
			return $url;
	}

    private function cURL($url){
        $ch = curl_init('http://www.imageshack.us/upload_api.php');
        $post = array('xml'=>"yes", "url"=>$url);
        curl_setopt_array($ch,array(             
							CURLOPT_POST => true,
							CURLOPT_HEADER => false,
							CURLOPT_RETURNTRANSFER =>true,
							CURLOPT_POSTFIELDS => $post
						    )
		          );
		return ($r=@curl_exec($ch))?$r:curl_error($ch);
		if(!empty($r)) die('Error na conexão com imageShack.');
	}

    public function getSrc(){
        $result = $this->cURL($this->validarURL($this->url));
                
        preg_match_all("/\<image_link\>(.*?)\<\/image_link\>/", $result, $captura);
        return $captura;
        //echo "<img src=" . $captura[1][0] ." /><br />";        
        //echo '<script>prompt("Uploaded image complete! - copy this URL >_<","'.$captura[1][0].'")</script>';
    }
}
?>