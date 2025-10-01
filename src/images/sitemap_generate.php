<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

class SitemapGenerate
{
	private function http_get($url)
	{
		$get = curl_init();

		curl_setopt($get, CURLOPT_URL, $url);
		curl_setopt($get, CURLOPT_RETURNTRANSFER, true);

		$content = curl_exec($get);

		curl_close($get);

		return $content;
	}

	public function getArticles($start, $end)
	{
		$articles = $this->http_get('https://emeequis.net/api/posts/notes/'.$start.'/'.$end);

		return json_decode($articles, true);
	}

	public function generate()
	{
		$end = time();
		$start = $end - (365 * 7 * 24 * 60 * 60);

		$articles = $this->getArticles($start, $end);

		$date = date('Y-m-d\TH:i:s\Z');

		$xml = '<?xml version="1.0" encoding="UTF-8"?>';
		$xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="https://www.w3.org/1999/xhtml">';
		$xml .= '<url>'.
                '<loc>https://www.m-x.com.mx</loc>'.
                '<lastmod>'.$date.'</lastmod>'.
            '</url>';

		$xml .= '<url>'.
                '<loc>https://www.m-x.com.mx/investigaciones</loc>'.
                '<lastmod>'.$date.'</lastmod>'.
            '</url>';

        $xml .= '<url>'.
                '<loc>https://www.m-x.com.mx/entrevistas</loc>'.
                '<lastmod>'.$date.'</lastmod>'.
            '</url>';

        $xml .= '<url>'.
                '<loc>https://www.m-x.com.mx/secretos</loc>'.
                '<lastmod>'.$date.'</lastmod>'.
            '</url>';

        $xml .= '<url>'.
                '<loc>https://www.m-x.com.mx/analisis</loc>'.
                '<lastmod>'.$date.'</lastmod>'.
            '</url>';

        $xml .= '<url>'.
                '<loc>https://www.m-x.com.mx/al-dia</loc>'.
                '<lastmod>'.$date.'</lastmod>'.
            '</url>';

        $xml .= '<url>'.
                '<loc>https://www.m-x.com.mx/desatinos</loc>'.
                '<lastmod>'.$date.'</lastmod>'.
            '</url>';

        $xml .= '<url>'.
                '<loc>https://www.m-x.com.mx/humor</loc>'.
                '<lastmod>'.$date.'</lastmod>'.
            '</url>';

        $xml .= '<url>'.
                '<loc>https://www.m-x.com.mx/videos</loc>'.
                '<lastmod>'.$date.'</lastmod>'.
            '</url>';

        $xml .= '<url>'.
                '<loc>https://www.m-x.com.mx/infografias</loc>'.
                '<lastmod>'.$date.'</lastmod>'.
            '</url>';

        $xml .= '<url>'.
                '<loc>https://www.m-x.com.mx/autores</loc>'.
                '<lastmod>'.$date.'</lastmod>'.
            '</url>';

		foreach ($articles as $article) {
			$url = 'https://www.m-x.com.mx/';
			$url_amp = 'https://amp.m-x.com.mx/';

			switch (strtolower($article['category'])) {
				case 'análisis':
					$url .= "analisis/".$article['link'];
					$url_amp .= "public/analisis/".$article['link'];
					break;

				case 'al día':
					$url .= "al-dia/".$article['link'];
					$url_amp .= "public/al-dia/".$article['link'];
					break;

				case 'infografías':
					$url .= "infografias/".$article['link'];
					$url_amp .= "public/infografias/".$article['link'];
					break;

				case 'fotogalerías':
					$url .= "fotogalerias/".$article['link'];
					$url_amp .= "public/fotogalerias/".$article['link'];
					break;
				
				default:
					$url .= strtolower($article['category'])."/".$article['link'];
					$url_amp .= "public/".strtolower($article['category'])."/".$article['link'];
					break;
			}

			$xml .= '<url>'.
                '<loc>'.$url.'</loc>'.
                '<xhtml:link rel="amphtml" href="'.$url_amp.'"/>'.
                '<lastmod>'.$article['publication'].'</lastmod>'.
                '<priority>1.0</priority>'.
            '</url>';
		}

		$xml .= '</urlset>';

		$fp = fopen('./sitemap.xml', 'w');
	    fwrite($fp, $xml);
	    fclose($fp);
	}
}

$sitemap = new SitemapGenerate;

$sitemap->generate();