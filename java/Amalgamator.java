import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.*;
import java.io.IOException;
import java.util.*;
//import javax.xml.transform.*;

class Amalgamator {

	public static void main(String[] args) throws FileNotFoundException, IOException, InterruptedException {
		Scanner sc = new Scanner(System.in);
		boolean play = true;
		while(play) {
			System.out.println("Howdy! Press y To amalgamate, n to stop...");
			String response = sc.nextLine();
			
			if(response.equals("y")) {
				String message = getConcept();
				char[] chars = message.toCharArray();
				for (int i = 0; i < chars.length; i++) {
					System.out.print(chars[i]);
					Thread.sleep(50);
				}
				//System.out.println("\n");
				message = getConcept();
				chars = message.toCharArray();
				for (int i = 0; i < chars.length; i++) {
					System.out.print(chars[i]);
					Thread.sleep(50);
				}
			} else if (response.equals("n")) {
				System.out.println("Goodbye...");
				play = false;
			}
		}
		sc.close();	
	}
	
	public static int getRandomNum(){
		Random r = new Random();
		int l = 1;
		int h = 1000;
		int result = r.nextInt(h-l) + l;
		return result;
	}
	
	public static String getConcept() {
		String csvFile = "roget.csv";
		BufferedReader br = null;
		String line = "";
		String newLine = "";
		String cvsSplitBy = ",";
		int rNum = getRandomNum();
		try {
			br = new BufferedReader(new FileReader(csvFile));
			for (int i = 0; i < rNum+1; i++){
				if(i == rNum) {
					line = br.readLine();
					String[] concept = line.split(cvsSplitBy);
					newLine = ("\t" + concept[6] + ": \n\t" + concept[5] + "\n\t" + concept[4] + "\n" + concept[3] + "\n\n");
					//newLine = (concept[3] + ": \n\t" + concept[6] + "\n\t" + concept[5] + "\n\t" + concept[4] + "\n\t"+ concept[2] + concept[1]);
				} 
				else {
					br.readLine();
				}
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (br != null) {
				try {
					br.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return newLine;
	}
}