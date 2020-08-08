package matzip.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import matzip.bean.MatzipDTO;
import matzip.dao.MatzipDAO;

@Service("matzipService")
public class MatzipServiceImpl implements MatzipService {
	@Autowired
	private MatzipDAO matzipDAO;
	private static String clientID = "hfPXyWE2CcZAhrdQrdHj";
    private static String clientSecret = "b8tHKB6IFb";
    public static StringBuilder sb;
	
	@Override
	public List<MatzipDTO> matzipList(String address) {
		// TODO Auto-generated method stub
		return matzipDAO.matzipList(address);
	}

	@Override
	public List<MatzipDTO> matzipList() {
		// TODO Auto-generated method stub
		return matzipDAO.matzipList();
	}

	@Override
	public MatzipDTO getMapzipView(String title1) {
		MatzipDTO matzipDTO = new MatzipDTO();
		String getTitle = title1;
		try {
    		int display= 5;
    		String text = URLEncoder.encode(getTitle, "utf-8");
    		//System.out.println(getTitle);
        	URL url;
			url= new URL("https://openapi.naver.com/v1/search/local?query=" + text + "&display=" + display + "&");
			
    	 HttpURLConnection con = (HttpURLConnection) url.openConnection();
         con.setRequestMethod("GET");
         con.setRequestProperty("X-Naver-Client-Id", clientID);
         con.setRequestProperty("X-Naver-Client-Secret", clientSecret);
         int responseCode = con.getResponseCode();
         BufferedReader br;
         if (responseCode == 200) {
             br = new BufferedReader(new InputStreamReader(con.getInputStream()));
         } else {
             br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
         }
         sb = new StringBuilder();
         String line;

         while ((line = br.readLine()) != null) {
             sb.append(line + "\n");
         }


         try {
			br.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
         con.disconnect();
         //System.out.println(sb);
         String data = sb.toString();
         String[] array;
         array = data.split("\"");
         System.out.println(array[0]);
         String[] title = new String[display];
         String[] link = new String[display];
         String[] category = new String[display];
         String[] description = new String[display];
         String[] telephone = new String[display];
         String[] address = new String[display];
         String[] roadAddress= new String[display];
         String[] mapx = new String[display];
         String[] mapy = new String[display];
         int k = 0;
         for (int i = 0; i < array.length; i++) {
             if (array[i].equals("title"))
                 title[k] = array[i + 2];
             if (array[i].equals("link"))
                 link[k] = array[i + 2];
             if (array[i].equals("category"))
                 category[k] = array[i + 2];
             if (array[i].equals("description"))
                 description[k] = array[i + 2];
             if (array[i].equals("telephone"))
                 telephone[k] = array[i + 2];
             if (array[i].equals("address"))
                 address[k] = array[i + 2];
             if (array[i].equals("mapx"))
                 mapx[k] = array[i + 2];
             if (array[i].equals("description")) 
            	 description[k] =array[i+2];
             if (array[i].equals("roadAddress")) 
            	 roadAddress[k] =array[i+2];
             if (array[i].equals("mapy")) {
                 mapy[k] = array[i + 2];
                 k++;
             }
             
		           
             
             
         }
	         for(int i=0;i<k;i++) {
	             matzipDTO.setTitle(title[i]);
	             matzipDTO.setLink(link[i]);
	             matzipDTO.setCategory(category[i]);
	             matzipDTO.setTime(description[i]);
	             matzipDTO.setTelephone(telephone[i]);
	             matzipDTO.setAddress(address[i]);
	             matzipDTO.setMapx(mapx[i]);
	             matzipDTO.setMapy(mapy[i]);
	             //matzipDTO.setDescription(description[i]);
	             matzipDTO.setRoadAddress(roadAddress[i]);
	       }
	         	
	         	//System.out.println(matzipDTO.getTitle());
         
         
    	} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}  catch (Exception e) {
            System.out.println(e);
        }

		return matzipDTO;
	}
	@Override
    public List<MatzipDTO> matzipSearch(String matzipText){
       List<MatzipDTO> list = new ArrayList<MatzipDTO>();
       String matzipText1 = matzipText;
       
       
       try {
          int display= 5;
          String text = URLEncoder.encode(matzipText1, "utf-8");
           URL url;
         url= new URL("https://openapi.naver.com/v1/search/local?query=" + text + "&display=" + display + "&");
         
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
         con.setRequestMethod("GET");
         con.setRequestProperty("X-Naver-Client-Id", clientID);
         con.setRequestProperty("X-Naver-Client-Secret", clientSecret);
         
         int responseCode = con.getResponseCode();
         
         BufferedReader br;
         if (responseCode == 200) {
             br = new BufferedReader(new InputStreamReader(con.getInputStream()));
         } else {
             br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
         }
         sb = new StringBuilder();
         String line;

         while ((line = br.readLine()) != null) {
             sb.append(line + "\n");
         }


         try {
         br.close();
      } catch (IOException e) {
         // TODO Auto-generated catch block
         e.printStackTrace();
      }
         con.disconnect();
         //System.out.println(sb);
         String data = sb.toString();
         String[] array;
         array = data.split("\"");
         String[] title = new String[display];
         String[] link = new String[display];
         String[] category = new String[display];
         String[] description = new String[display];
         String[] telephone = new String[display];
         String[] address = new String[display];
         String[] roadAddress= new String[display];
         String[] mapx = new String[display];
         String[] mapy = new String[display];
         int k = 0;
         for (int i = 0; i < array.length; i++) {
             if (array[i].equals("title"))
                 title[k] = array[i + 2];
             if (array[i].equals("link"))
                 link[k] = array[i + 2];
             if (array[i].equals("category"))
                 category[k] = array[i + 2];
             if (array[i].equals("description"))
                 description[k] = array[i + 2];
             if (array[i].equals("telephone"))
                 telephone[k] = array[i + 2];
             if (array[i].equals("address"))
                 address[k] = array[i + 2];
             if (array[i].equals("mapx"))
                 mapx[k] = array[i + 2];
             if (array[i].equals("description")) 
                description[k] =array[i+2];
             if (array[i].equals("roadAddress")) 
                roadAddress[k] =array[i+2];
             if (array[i].equals("mapy")) {
                 mapy[k] = array[i + 2];
                 k++;
             }
             
                 
            //System.out.println(k); 
             
         }
         for(int i=0;i<k;i++) {
               MatzipDTO matzipDTO = new MatzipDTO();
               matzipDTO.setTitle(title[i]);
               matzipDTO.setLink(link[i]);
               matzipDTO.setCategory(category[i]);
               matzipDTO.setTime(description[i]);
               matzipDTO.setTelephone(telephone[i]);
               matzipDTO.setAddress(address[i]);
               matzipDTO.setMapx(mapx[i]);
               matzipDTO.setMapy(mapy[i]);
               //matzipDTO.setDescription(description[i]);
               matzipDTO.setRoadAddress(roadAddress[i]);
               list.add(i,matzipDTO);
         }
         
         //System.out.println(matzipText1);
         //System.out.println(list.get(0).getTitle());
         
         
       } catch (MalformedURLException e) {
         // TODO Auto-generated catch block
         e.printStackTrace();
      }  catch (Exception e) {
            System.out.println(e);
        }
       
       return list;
       

    }

	@Override
	public MatzipDTO getMapzipView2(String title) {
		// TODO Auto-generated method stub
		return matzipDAO.getMatzipView(title);
	}

}